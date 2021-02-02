import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { getGroupsPerNameKart, getMembersOfGroupKart } from 'api/api';

export default ({onGettingMembers}) => {
    const [options, setOptions] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const loading = open && options.length === 0;


        const fetchGroups = async (e) => {
            let value = e.target.value;
            setOptions([]);

            if (value.length > 1) {
                setOpen(true);
                const groups = await getGroupsPerNameKart(value);
                setOptions(groups);
            }
            else {
                setOpen(false);
            }
        }

        const fetchMembers = async (group) => {
            if(!group) {
                onGettingMembers([]);
                return;
            }
            const persons = await getMembersOfGroupKart(group.id);
            const personIds = persons.map(person => person.id);
            console.log(personIds);
            onGettingMembers(personIds);
        }

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: '100%' }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(event,value) => fetchMembers(value)}
            // getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.hierarchy}
            filterOptions={x => x}
            options={options}
            loading={loading}
            noOptionsText={'אין תוצאות'}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onChange={(e) => {
                        fetchGroups(e);
                    }}
                    // label="חפש"
                    placeholder="חפש לפי קבוצה"
                    variant="standard"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />
    );
}