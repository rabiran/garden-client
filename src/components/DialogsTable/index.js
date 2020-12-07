import React from "react";
import './style.css'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import MaterialTable from 'material-table'
import hebrewLocalization from 'config/tableHebrew';
import Select from "@material-ui/core/Select";
import tableIcons from 'config/tableIcons';


export default ({ usersSelected, setUsersSelected, setLastUserSelectedUniqueId }) => {


    const handleRowChangedDomain = (oldData,event) => {

        setLastUserSelectedUniqueId(event.target.value)
        setUsersSelected(usersSelected.map(user =>{
          if(user.id == oldData.id){
            user.primaryUniqueIdIndex = event.target.value;
          }
          return user;
        }))
    
    
    
    };
  return (
    <div>
      <MaterialTable
        style={{ marginTop: "50px" }}
        title="משתמשים שנוספו"
        localization={hebrewLocalization}
        columns={[
          { title: "שם", field: "name" },
          { title: "מספר אישי", field: "id" },
          { title: "היררכיה", field: "hierarchy" },
          {
            title: "שינוי יוז'ר ראשי",
            render: (rowData) => (
              <Select
                native
                value={rowData.primaryUniqueIdIndex}
                onChange={(e) => handleRowChangedDomain(rowData, e)}
              >
                {rowData != null
                  ? rowData.domainUsers.map((el, index) => (
                      <option key={index} value={index}>
                        {el.uniqueId}
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
                {" "}
                {JSON.parse(
                  JSON.stringify(
                    rowData.domainUsers[rowData.primaryUniqueIdIndex][
                      "dataSource"
                    ]
                  )
                )}
              </p>
            ),
          },
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
              async function DeleteUsers() {
                await rowData.forEach((userToDel) => {
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
    </div>
  );
};
