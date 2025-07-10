import Auth from './auth';
const paths: Record<string, object> = {};
Auth.forEach((path) => (paths[path.path] = path.object));
export default paths;
