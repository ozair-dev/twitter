import React, { useState, useEffect } from 'react';

import { useLocation, Link } from 'react-router-dom';

import NavLink from '../navLink';
import NavOptions from '../navOptions';

import Box from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import TwitterIcon from '@mui/icons-material/Twitter';

// Icons
import {
  AiOutlineHome as HomeIconOutlined,
  AiFillHome as HomeIconFilled,
  AiOutlineMessage as MessageIconOutlined,
  AiFillMessage as MessageIconFilled
} from 'react-icons/ai';
import { RiHashtag as HashIconOutlined } from 'react-icons/ri';
import { FaHashtag as HashIconFilled } from 'react-icons/fa';
import { BsPeople as PeopleIconOutlined, BsPeopleFill as PeopleIconFilled } from 'react-icons/bs';
import {
  IoIosNotificationsOutline as NotificationIconOutlined,
  IoIosNotifications as NotificationIconFilled
} from 'react-icons/io';
import {
  IoBookmarkOutline as BookmarkIconOutlined,
  IoBookmarkSharp as BookmarkIconFilled
} from 'react-icons/io5';

import {
  RiUser6Line as UserIconOutlined,
  RiUser6Fill as UserIconFilled,
  RiMoreLine as MoreIconOutlined,
  RiMoreFill as MoreIconFilled
} from 'react-icons/ri';

import { GiFeather } from 'react-icons/gi';

const Leftbar = () => {
  const [activePage, setActivePage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const currentPage = location.pathname.split('/')[2];
    setActivePage(currentPage);
  }, [location]);

  return (
    <Box
      component="div"
      sx={{
        position: 'sticky',
        top: 0,
        pl: { xs: 1, sm: 2, md: 5 },
        pr: { xs: 1, sm: 2 },
        py: { xs: 1, sm: 2 },
        width: { xs: 'fit-content', md: 1 / 4 },
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 1
      }}>

      <Box
        component="div"
        sx={{
          '& > a': { textDecoration: 'none', color: 'secondary.dark' }
        }}>

        <Link to="home">
          <IconButton color="primary">
            <TwitterIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Link>

        <NavLink
          activePage={activePage}
          IconOutlined={
            <Badge color="primary" variant="dot">
              <HomeIconOutlined />
            </Badge>
          }
          IconFilled={
            <Badge color="primary" variant="dot">
              <HomeIconFilled />
            </Badge>
          }
          value="Home"
        />

        <NavLink
          activePage={activePage}
          IconOutlined={<HashIconOutlined />}
          IconFilled={<HashIconFilled />}
          value="Explore"
        />
        <NavLink
          activePage={activePage}
          IconOutlined={<PeopleIconOutlined />}
          IconFilled={<PeopleIconFilled />}
          value="Communitites"
        />
        <NavLink
          activePage={activePage}
          IconOutlined={<NotificationIconOutlined />}
          IconFilled={<NotificationIconFilled />}
          value="Notifications"
        />
        <NavLink
          activePage={activePage}
          IconOutlined={<MessageIconOutlined />}
          IconFilled={<MessageIconFilled />}
          value="Messages"
        />
        <NavLink
          activePage={activePage}
          IconOutlined={<BookmarkIconOutlined />}
          IconFilled={<BookmarkIconFilled />}
          value="Bookmarks"
        />
        <NavLink
          activePage={activePage}
          IconOutlined={<UserIconOutlined />}
          IconFilled={<UserIconFilled />}
          value="Profile"
        />
        <NavLink
          activePage={activePage}
          IconOutlined={<MoreIconOutlined />}
          IconFilled={<MoreIconFilled />}
          value="More"
        />

        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            width: 1,
            borderRadius: 10,
            py: 1.5,
            mt: 2,
            '& > span:nth-of-type(1)': {
              display: { md: 'none' }
            },
            '& > span:nth-of-type(2)': {
              display: { xs: 'none', md: 'initial' }
            }
          }}
          startIcon={<GiFeather />}
          endIcon={<span>Tweet</span>}></Button>
      </Box>
      <NavOptions />
    </Box>
  );
};

export default Leftbar;
