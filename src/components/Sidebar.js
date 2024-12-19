import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ActionIcon from '@mui/icons-material/Whatshot';
import AdventureIcon from '@mui/icons-material/NaturePeople';
import ComedyIcon from '@mui/icons-material/SentimentVerySatisfied';
import CrimeIcon from '@mui/icons-material/Gavel';
import DramaIcon from '@mui/icons-material/TheaterComedy';
import HorrorIcon from '@mui/icons-material/Warning';
import ThrillerIcon from '@mui/icons-material/LocalMovies';
import { Typography } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science'; 
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';  

export default function SwipeableTemporaryDrawer({state,setState, toggleDrawer} ) {
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,bgcolor:'#232f3e' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{color:"inherit",bgcolor:'#a9a9a9',Color:"white"}}>
        <Typography sx={{ml:10,mb:5,mt:5,variant:"h1",font:'message-box'}}>
          <b>GENRES</b>
        </Typography>
        {[
          
          { text: 'Action', icon: <ActionIcon /> },
          { text: 'Adventure', icon: <AdventureIcon /> },
          { text: 'Comedy', icon: <ComedyIcon /> },
          { text: 'Crime', icon: <CrimeIcon /> },
          { text: 'Drama', icon: <DramaIcon /> },
          { text: 'Horror', icon: <HorrorIcon /> },
          { text: 'Scifi', icon: <ScienceIcon/> },
          { text: 'Thriller', icon: <ThrillerIcon/> },
          { text: 'War', icon: <MilitaryTechIcon/> },

        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{mt:2}}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
