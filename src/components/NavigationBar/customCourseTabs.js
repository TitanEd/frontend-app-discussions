// Course tabs added by the custom UI (the backend tab list does not have them). The pages live in
// the Learning MFE (src/course-tabs/customCourseTabs.js there adds the same two tabs).
import messages from './messages';

const CUSTOM_TAB_SLUGS = ['bookmarks', 'updates'];

/**
 * The backend tabs plus "Bookmarks" and "Updates", placed before "Instructor" (or at the end).
 * Their address comes from the "Course" tab, which points at the Learning MFE:
 * …/learning/course/<id>/home.
 */
export const withCustomTabs = (tabs, intl) => {
  const home = tabs.find((tab) => /\/course\/[^/]+\/home\/?$/.test(tab.url || ''));
  if (!home) {
    return tabs;
  }
  const base = home.url.replace(/\/home\/?$/, '');
  const titles = { bookmarks: messages.bookmarksTab, updates: messages.updatesTab };
  const customTabs = CUSTOM_TAB_SLUGS
    .filter((slug) => !tabs.some((tab) => tab.slug === slug))
    .map((slug) => ({ slug, title: intl.formatMessage(titles[slug]), url: `${base}/${slug}` }));

  const instructorIndex = tabs.findIndex((tab) => tab.slug === 'instructor');
  if (instructorIndex === -1) {
    return [...tabs, ...customTabs];
  }
  return [...tabs.slice(0, instructorIndex), ...customTabs, ...tabs.slice(instructorIndex)];
};

export default withCustomTabs;
