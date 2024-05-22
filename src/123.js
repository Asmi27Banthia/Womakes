import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";


const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return roles[Math.floor(Math.random() * roles.length)];
};

const initialRows = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: 25 + index,
  joinDate: new Date(),
  role: randomRole(),
  email: `user${index + 1}@example.com`,
}));

function EditToolbar(props) {
  const { setRows, setRowModesModel, rows, setSearchQuery } = props;
  const [open, setOpen] = React.useState(false);
  const [newRecord, setNewRecord] = React.useState({
    id: initialRows.length + 1,
    name: "",
    age: "",
    joinDate: "",
    role: "",
    email: "",
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field === "joinDate") {
      // Convert the string value to a Date object
      const date = new Date(value);
      setNewRecord({ ...newRecord, [field]: date });
    } else {
      setNewRecord({ ...newRecord, [field]: value });
    }
  };
  const handleAddRecord = () => {
    setRows([...rows, newRecord]);
    setOpen(false);
    setNewRecord({
      id: initialRows.length + 1,
      name: "",
      age: "",
      joinDate: "",
      role: "",
      email: "",
    });
  };

  const handleExport = () => {
    // Convert rows to CSV format
    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((row) => Object.values(row).join(",")).join("\n");

    // Create a hidden link element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
    aaaa

      {/* <GridToolbarContainer>
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically
    backgroundColor: "dark.main",
    width: "100%",
    height: "60px", // Set a fixed height
    padding: 2,
  }}
>
  <div>
    <Typography
      variant="h4"
      className="admin_rolehead"
      color="white.main"
    >
      Admin Role
    </Typography>
  </div>
  <div className="buttons">
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      sx={{ height: "100%", marginRight: "6px"  }} // Ensure search bar height matches parent
      onChange={handleSearch}
    />
    <Button
      variant="contained"
      color="success"
      className="addicon"
      startIcon={<AddIcon />}
      sx={{ height: "100%", marginRight: "6px" }} // Ensure button height matches parent
      onClick={handleClick}
    >
      Add Record
    </Button>
    <Button
      variant="contained"
      color="success"
      startIcon={<AddIcon />}
      sx={{ height: "100%" }} // Ensure button height matches parent
      onClick={handleExport}
    >
      Export CSV
    </Button>
  </div>
</Box>

      </GridToolbarContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Record</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newRecord.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number" // Restrict to accept only numbers
            fullWidth
            value={newRecord.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Join Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: "1900-01-01", // Set a minimum date
              },
            }}
            fullWidth
            value={
              newRecord.joinDate instanceof Date
                ? newRecord.joinDate.toISOString().split("T")[0]
                : newRecord.joinDate
            }
            onChange={(e) => handleInputChange("joinDate", e.target.value)}
          />

          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={newRecord.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email Address"
            fullWidth
            value={newRecord.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRecord} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

export default function Adper() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [sorting, setSorting] = React.useState([
    { field: "name", order: "asc" },
  ]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows((prevRows) =>
      prevRows
        .filter((row) => row.id !== id)
        .map((row, index) => ({ ...row, id: index + 1 }))
    );
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleSortModelChange = (newSortModel) => {
    setSorting(newSortModel);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 130, editable: true },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "joinDate",
      headerName: "Join date",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            sx={{
              color: "red",
            }}
          />,
        ];
      },
    },
  ];

  return (

      // <Box
      //   sx={{
      //     height: 500,
      //     width: "100%",
      //     "& .actions": {
      //       color: "text.secondary",
      //     },
      //     "& .textPrimary": {
      //       color: "text.primary",
      //     },
      //   }}
      // >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: (props) => (
              <EditToolbar
                {...props}
                setRows={setRows}
                setRowModesModel={setRowModesModel}
                setSearchQuery={setSearchQuery}
                rows={rows}
              />
            ),
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, setSearchQuery },
          }}
          sorting={sorting}
          onSortModelChange={handleSortModelChange}
        />
      // </Box>
      

  );
}
