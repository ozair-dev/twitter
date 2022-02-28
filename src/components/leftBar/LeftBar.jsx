import React from 'react';

import NavLink from '../navLink';
import NavOptions from '../navOptions';

import Box from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
        <NavLink IconOutlined={HomeIconOutlined} IconFilled={HomeIconFilled} value="Home" />
        <NavLink IconOutlined={HashIconOutlined} IconFilled={HashIconFilled} value="Explore" />
        <NavLink
          IconOutlined={PeopleIconOutlined}
          IconFilled={PeopleIconFilled}
          value="Communitites"
        />
        <NavLink
          IconOutlined={NotificationIconOutlined}
          IconFilled={NotificationIconFilled}
          value="Notifications"
        />
        <NavLink
          IconOutlined={MessageIconOutlined}
          IconFilled={MessageIconFilled}
          value="Messages"
        />
        <NavLink
          IconOutlined={BookmarkIconOutlined}
          IconFilled={BookmarkIconFilled}
          value="Bookmarks"
        />
        <NavLink IconOutlined={UserIconOutlined} IconFilled={UserIconFilled} value="Profile" />
        <NavLink IconOutlined={MoreIconOutlined} IconFilled={MoreIconFilled} value="More" />

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
