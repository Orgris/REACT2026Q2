export const handleResponse = async (res: Response, entity: string) => {
  if (res.ok) return res;

  if (res.status === 404) {
    throw new Error(`404: ${entity} not found`);
  }

  if (res.status >= 500) {
    throw new Error(`500: Server error while fetching ${entity}`);
  }

  throw new Error(`Failed to fetch ${entity} (status: ${res.status})`);
};
