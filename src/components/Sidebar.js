import React from 'react';
import { Drawer, List, ListItem, Button} from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { blue } from '@mui/material/colors';

const SidebarWithButton = () => {
  return (
    <Drawer variant="permanent" sx={{  '& .MuiDrawer-paper': {
        width: 220,
        backgroundColor: 'black',color:'white',marginTop:8}}}>
      <List>
        <ListItem>
          <Button variant="contained" sx={{background:'red',color:'white'}}>Categories</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-clapperboard" style={{ fontSize: '15px', color:'red' }}></i>


          <Button sx={{color:'white'}} >Popular</Button>
        </ListItem>
        <ListItem>
        <i class="fa-solid fa-star"style={{fontSize:'15px',color:'red'}}></i>

        <Button  sx={{color:'white'}} >Top Rated</Button>

        </ListItem>
        <ListItem>
        <i className="fas fa-sun" style={{ fontSize: '16px', color: 'red' }}></i>
        <Button  sx={{color:'white'}}>Upcoming</Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" sx={{background:'red'}}>Genres</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-film" style={{ fontSize: '15px', color: 'red' }}></i>   
                 <Button  sx={{color:'white'}}>Action</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-film" style={{ fontSize: '15px', color: 'red' }}></i>   
            <Button  sx={{color:'white'}}>Adventure</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-bug" style={{ fontSize: '15px', color: 'red' }}></i>
        <Button  sx={{color:'white'}}>Animation</Button>
        </ListItem>
        <ListItem>
        <i className="fas fa-laugh" style={{ fontSize: '15px', color: 'red' }}></i>

            <Button  sx={{color:'white'}}>Comedy</Button>
        </ListItem>
        </List>
    </Drawer>
  );
};
export default SidebarWithButton;


