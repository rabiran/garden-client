// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getGroupsPerNameKart, getMembersOfGroupKart } from 'api/api';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default ({onGettingMembers}) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;


        const fetchGroups = async (e) => {
            let value = e.target.value;
            setOptions([]);
            //   const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            //   await sleep(400); // For demo purposes.
            //   const countries = await response.json();
            if (value.length > 1) {
                const groups = await getGroupsPerNameKart();
                setOptions(groups);
            }
            else {
                setOpen(false);
            }
        }

        const fetchMembers = async (group) => {
            const persons = await getMembersOfGroupKart(group.id);
            const personIds = persons.map(person => person.id);
            onGettingMembers(personIds);
        }

    return (
        <Autocomplete
            id="asynchronous-demo"
            // style={{ width: 300 }}
            open={open}
            // onOpen={() => {
            //     setOpen(true);
            // }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(event,value) => fetchMembers(value)}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.fullName}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    onChange={(e) => {
                        fetchGroups(e);
                    }}
                    label="Asynchronous"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}