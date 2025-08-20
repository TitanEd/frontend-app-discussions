import React from 'react';

import {
  DIRECT_PLUGIN,
  PLUGIN_OPERATIONS,
} from '@openedx/frontend-plugin-framework';

import CourseHeader from './src/components/Head/CourseHeader';
import CustomCourseTabsNavigation from './src/components/NavigationBar/CustomCourseTabsNavigation';
import CustomDiscussionsHome from './src/discussions/discussions-home/CustomDiscussionsHome';

const config = {
  ...process.env,
  pluginSlots: {
    course_header_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'course_header_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CourseHeader {...props} />,
          },
        },
      ],
    },
    course_tab_navigation_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'course_tab_navigation_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomCourseTabsNavigation {...props} />,
          },
        },
      ],
    },
    discussions_home_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'discussions_home_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomDiscussionsHome {...props} />,
          },
        },
      ],
    },
  },
};

export default config;
