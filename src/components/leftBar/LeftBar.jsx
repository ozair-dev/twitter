import React from 'react';
import { Link } from 'react-router-dom';

import NavOptions from '../navOptions';

import NavLink from '../navLink';

import Box from '@mui/material/Typography';
import Button from '@mui/material/Button';

import TwitterIcon from '@mui/icons-material/Twitter';

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
  return (
    <Box
      component="div"
      sx={{
        position: 'relative',
        pl: 5,
        pr: 2,
        py: 2,
        width: { xs: 'fit-content', md: 1 / 4 },
        height: '100vh'
      }}>
      <TwitterIcon color="primary" sx={{ fontSize: 40 }} />
      <Box
        component="div"
        sx={{
          '& > a': { textDecoration: 'none', color: 'secondary.dark' }
        }}>
        <NavLink
          to="home"
          IconOutlined={HomeIconOutlined}
          IconFilled={HomeIconFilled}
          text="Home"
          active={false}
        />
        <NavLink
          to="explore"
          IconOutlined={HashIconOutlined}
          IconFilled={HashIconFilled}
          text="Explore"
          active={false}
        />
        <NavLink
          to="communities"
          IconOutlined={PeopleIconOutlined}
          IconFilled={PeopleIconFilled}
          text="Communitites"
          active={false}
        />
        <NavLink
          to="notifications"
          IconOutlined={NotificationIconOutlined}
          IconFilled={NotificationIconFilled}
          text="Notifications"
          active={false}
        />
        <NavLink
          to="messages"
          IconOutlined={MessageIconOutlined}
          IconFilled={MessageIconFilled}
          text="Messages"
          active={false}
        />
        <NavLink
          to="bookmarks"
          IconOutlined={BookmarkIconOutlined}
          IconFilled={BookmarkIconFilled}
          text="Bookmarks"
          active={false}
        />
        <NavLink
          to="profile"
          IconOutlined={UserIconOutlined}
          IconFilled={UserIconFilled}
          text="Profile"
          active={false}
        />
        <NavLink
          to="more"
          IconOutlined={MoreIconOutlined}
          IconFilled={MoreIconFilled}
          text="More"
          active={false}
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
