import { useMemo } from 'react';
import { useLocation, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';

export interface ParsedQuery {
  [key: string]: any;
}
export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  return useMemo(() => {
    const query: ParsedQuery = {
      ...queryString.parse(location.search), // Convert string to object
      ...params,
    };
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query,
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}
