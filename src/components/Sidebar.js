import React from 'react';
import { Drawer, List, ListItem, Button, Typography } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SidebarWithButton = () => {
  return (
    <Drawer variant="permanent" sx={{  '& .MuiDrawer-paper': {
        width: 190,
        backgroundColor: 'black',color:'white',marginTop:'5'}}}>
      <List>
        <ListItem>
          <Button variant="contained" sx={{background:'orange',color:'white',width:"95%",fontSize:'16px'}}>Categories</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-clapperboard" style={{ fontSize: '13px' }}></i>


          <Button sx={{color:'white'}} >Popular</Button>
        </ListItem>
        <ListItem>
        <i class="fa-solid fa-star"style={{fontSize:'13px'}}></i>

        <Button  sx={{color:'white'}} >Top Rated</Button>

        </ListItem>
        <ListItem>
        <i className="fas fa-sun" style={{ fontSize: '13px'}}></i>
        <Button  sx={{color:'white'}}>Upcoming</Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" sx={{background:'orange',width:"95%",fontSize:'16px'}}>Genres</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-film" style={{ fontSize: '13px'}}></i>   
                 <Button  sx={{color:'white'}}>Action</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-film" style={{ fontSize: '13px'}}></i>   
            <Button  sx={{color:'white'}}>Adventure</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-bug" style={{ fontSize: '13px' }}></i>
        <Button  sx={{color:'white'}}>Animation</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-laugh" style={{ fontSize: '13px'}}></i>

            <Button  sx={{color:'white'}}>Comedy</Button>
        </ListItem>
        </List>
    </Drawer>
  );
};
export default SidebarWithButton;