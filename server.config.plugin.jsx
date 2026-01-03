from tutor import hooks
from tutormfe.hooks import PLUGIN_SLOTS


hooks.Filters.ENV_PATCHES.add_item(
     (
         "mfe-env-config-runtime-definitions-discussions",
         """
        // This file contains configuration for plugins and environment variables.
const { PLUGIN_OPERATIONS, DIRECT_PLUGIN } = await import('@openedx/frontend-plugin-framework');
const { default: CourseHeader } = await import('./src/components/Head/CourseHeader');
const { default: CustomCourseTabsNavigation } = await import('./src/components/NavigationBar/CustomCourseTabsNavigation');
const { default: CustomDiscussionsHome } = await import('./src/discussions/discussions-home/CustomDiscussionsHome');

{% raw %}

config = {
  ...config,
  ...process.env,
}

config.pluginSlots = {
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
  };
{% endraw %}
"""
     ))
