import React from 'react';
import { Drawer, List, ListItem, Button } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SidebarWithButton = () => {
  return (
    <Drawer variant="permanent" sx={{ '& .MuiDrawer-paper': {
      width:220,backgroundColor:'black',marginTop:13
    }}}>
      <List>
        <ListItem>
          <Button variant="contained"  sx={{background:'red'}}>Categories</Button>
        </ListItem>
        <ListItem >
        <i className="fas fa-clapperboard"  style={{ fontSize: '20px' ,color:'red' }}>
      </i>
        <Button sx={{color:'white'}} >Popular</Button>
        </ListItem>
        <ListItem>
          <i className='fa-solid fa-star' style={{ fontSize: '20px',color:'red' }}>
          </i> 
        <Button sx={{color:'white'}}>Top rated</Button>
        </ListItem>
        <ListItem>
        <i className='fas fa-sun' style={{ fontSize: '20px',color:'red' }}>
        </i> 
        <Button sx={{color:'white'}}>Upcoming</Button>
        </ListItem>
        <ListItem>
          <Button variant="contained"  sx={{background:'red'}}>Genre</Button>
        </ListItem>
        <ListItem>
        <i className='fas fa-film' style={{ fontSize: '15px',color:'red' }}>
        </i> 
        <Button sx={{color:'white'}}>Actions</Button>
        </ListItem>
        <ListItem>
        <i className='fas fa-film' style={{ fontSize: '15px',color:'red' }}>
        </i> 
        <Button sx={{color:'white'}}>Adventures</Button>
        </ListItem>
        <ListItem>
        <i className='fas fa-bug' style={{ fontSize: '15px',color:'red' }}>
        </i> 
        <Button sx={{color:'white'}}>Animations</Button>
        </ListItem>
        <ListItem>
        <i className='fa-solid fa-masks-theater' style={{ fontSize: '15px',color:'red' }}>
        </i>

        <Button sx={{color:'white'}}>Comedy</Button>
        </ListItem>
        {/* <ListItem>
        <Button>Setting</Button>
        </ListItem> */}
      </List>
    </Drawer>
  );
};

export default SidebarWithButton;