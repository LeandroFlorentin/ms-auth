import Auth from './auth';
const paths: any = {};
Auth.forEach((path) => (paths[path.path] = path.object));
export default paths;
