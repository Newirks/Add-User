import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'
import UserListComponent from '../components/UserListComponent'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from "react-loading";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    id: uuidv4(),
                    name: "Mark",
                    surname: "Otto",
                    username: "markotto"
                },
                {
                    id: uuidv4(),
                    name: "Marks",
                    surname: "TOtto",
                    username: "smarkotto"
                },
                {
                    id: uuidv4(),
                    name: "Rarks",
                    surname: "ZOtto",
                    username: "yumarkotto"
                }
            ]
        };
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    addUser = (name,surname,username) => {
        if(name,surname,username){
            const users = [...this.state.users];
            users.push({
                id:uuidv4(),
                name:name,
                surname:surname,
                username:username
            });
            this.setState({users});
            toast.success(`"${name}" Add User.`);
        }else{
            toast.error("Please fill all fields.");
            
        }

    };

    deleteUser = (obj) => {
        const users = this.state.users.filter((user) => {
            return user.id !== obj.id;
        });
        this.setState({users});
        toast.success(`"${obj.name}" Delete User.`);
    };

    editUser = (id,name,surname,username) => {
        if(id,name,surname,username){
            const users = [...this.state.users]
            let updatedUsers = users.map(user=>{
                if(user.id===id){
                    user = {
                        id:id,
                        name:name,
                        surname:surname,
                        username:username,
    
                    };
                }
                return user;
            });
            this.setState({
                users:updatedUsers,
            });
            toast("Update User");
        }
    }
    componentDidMount() {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 5000);
      }
    render() {
        return (
            <div>
            {this.state.loading ? (
              <div className="container">
                <div className="d-flex align-items center justify-content-center mt-5">
                  <ReactLoading
                    type="spokes"
                    color="orange"
                    height={"20%"}
                    width={"20%"}
                  />
                </div>
              </div>
            ) : (
              <>
                <ToastContainer />
                <Navbar color="light" expand="md" light>
                  <div className="container">
                    <NavbarBrand href="/">React Add User</NavbarBrand>
                  </div>
                </Navbar>
                <UserListComponent
                  users={this.state.users}
                  addUser={this.addUser}
                  deleteUser={this.deleteUser}
                  editUser={this.editUser}
                />
              </>
            )}
          </div>
        )
    }
}
