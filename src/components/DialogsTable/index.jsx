import React from "react";
import './style.css'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import MaterialTable from 'material-table'
import hebrewLocalization from 'config/tableHebrew';
import Select from "@material-ui/core/Select";
import tableIcons from 'config/tableIcons';
import Box from '@material-ui/core/Box'
import { Checkbox } from "@material-ui/core";


export default ({ usersSelected, setUsersSelected }) => {

  const AdK = "1"
  const Kapaim ="2"
  const ONE = "3"

    const handleRowChangedDomain = (oldData,event) => {

       
        setUsersSelected(usersSelected.map(user =>{
          if(user.id == oldData.id){
            user.primaryUniqueId = event.target.value;
          }
          return user;
        }))
    
    
    
    };
    const handleCheckedUserRowData = (rowData,event) => {
      
      setUsersSelected(usersSelected.map(user =>{
        if(user.id === rowData.id){
          user.newUser = !user.newUser;
        }
        return user;
      }))

    }
  return (
    <div>
      <Box boxShadow={12} >
      <MaterialTable
        
        style={{ marginTop: "30px"  }}
        title="משתמשים שנוספו"
        
        localization={hebrewLocalization}
        columns={[
          { title: "שם", field: "name" },
          { title: "מספר אישי", field: "personalNumber" },
          { title: "היררכיה", field: "hierarchy" },
          {
            title: "שינוי יוז'ר ראשי",
            
            render: (rowData) => (
              <Select
                native
                value={rowData.primaryUniqueId}
                onChange={(e) => handleRowChangedDomain(rowData, e)}
              >
                {rowData != null
                  ? rowData.domainUsers.map((el, index) => (
              <option  
             
                  key={index} value={el.uniqueId}>{el.uniqueId} 
             </option>
                    ))
                  : null}
              </Select>
            ),
          },

          {
            title: "דומיין",
            
            render: (rowData) => (
              <p>
              
             
                {
                    rowData.domainUsers.find((el) => el.uniqueId === rowData.primaryUniqueId).dataSource
                    
                  
                }
              </p>
            ),
          },
          {
            title: "משתמש חדש",
            render: (rowData) =>(                                 
            <Checkbox checked={rowData.newUser} onClick={(e) => handleCheckedUserRowData(rowData,e)}/>                                                           
            )
          }
        
        ]}
        options={{
          selection: true,
          debounceInterval: 200,
        }}
        actions={[
          {
            icon: () => <DeleteOutlined />,
            tooltip: "מחק משתמשים",
            onClick: (event, rowData) => {
              let newArr = usersSelected;
               function DeleteUsers() {
                 rowData.forEach((userToDel) => {
                  newArr = newArr.filter((element) => {
                    return element.id != userToDel.id;
                  });
                });
                setUsersSelected(newArr);
              }
              DeleteUsers();
            },
          },
        ]}
        icons={tableIcons}
        data={
          usersSelected != undefined && usersSelected.length > 0
            ? JSON.parse(JSON.stringify(usersSelected))
            : []
        }
      />
      </Box>
    </div>
  );
};
