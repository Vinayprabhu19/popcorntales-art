import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function SocialMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="social-menu" aria-haspopup="true" onClick={handleClick} id="socialMenu">
        <AssistantPhotoIcon style={{ color: 'white' }} fontSize={"default"} />
      </Button>
      {
      Boolean(anchorEl) && <Menu
        id="social-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {/* <MenuItem onClick={handleClose}>
        <a href="https://www.twitter.com/PopcornTaless" className="social-icon">
              <TwitterIcon fontSize={"default"}/>
          </a></MenuItem> */}
        <MenuItem onClick={handleClose}>
        <a href="https://www.facebook.com/popcorntales" className="social-icon">
              <FacebookIcon fontSize={"default"}/>
          </a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <a href="https://www.instagram.com/popcorntaless" className="social-icon">
              <InstagramIcon fontSize={"default"}/>
          </a>
        </MenuItem>
      </Menu>}
    </div>
  );
}