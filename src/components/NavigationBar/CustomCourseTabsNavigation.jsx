import React, { useMemo } from 'react';

import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';

import CustomTabs from './tabs/CustomTabs';
import { withCustomTabs } from './customCourseTabs';
import messages from './messages';

import './navBar.scss';

const CustomCourseTabsNavigation = () => {
  const intl = useIntl();
  const backendTabs = useSelector(state => state.courseTabs.tabs);
  const tabs = useMemo(() => withCustomTabs(backendTabs, intl), [backendTabs, intl]);

  return (
    <div id="courseTabsNavigation" className="mb-3 course-tabs-navigation">
      <div className="container-xl">
        <div className="nav-bar">
          <div className="nav-menu">
            {!!tabs.length && (
              <CustomTabs
                className="nav-underline-tabs"
                aria-label={intl.formatMessage(messages.courseMaterial)}
              >
                {tabs.map(({ url, title, slug }) => (
                  <a
                    key={slug}
                    className={classNames('nav-item flex-shrink-0 nav-link', { active: slug === 'discussion' })}
                    href={url}
                  >
                    {title}
                  </a>
                ))}
              </CustomTabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomCourseTabsNavigation);
