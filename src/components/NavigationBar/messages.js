import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  courseMaterial: {
    id: 'navigation.course.tabs.label',
    defaultMessage: 'Course Material',
    description: 'The accessible label for course tabs navigation',
  },
  bookmarksTab: {
    id: 'learning.custom.tabs.bookmarks',
    defaultMessage: 'Bookmarks',
    description: 'Course tab that opens the bookmarks page of the Learning MFE',
  },
  updatesTab: {
    id: 'learning.custom.tabs.updates',
    defaultMessage: 'Updates',
    description: 'Course tab that opens the course updates page of the Learning MFE',
  },
});

export default messages;
