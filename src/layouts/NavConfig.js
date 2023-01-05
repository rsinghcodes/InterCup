// component
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/admin/manage-users',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'questions',
    path: '/admin/manage-questions',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'quizzes',
    path: '/admin/manage-quizzes',
    icon: getIcon('material-symbols:quiz-sharp'),
  },
  {
    title: 'topics',
    path: '/topics/practice',
    icon: getIcon('eva:file-text-fill'),
  },
];

export default navConfig;
