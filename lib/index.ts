export * from './keys/types';
export * from './workspaces/types';
import { createSession } from './factory';

const onSession = async () => {
  try {
    const ds = await createSession('ds_fS8k5zPmjX9haMGwIJVsezT5m2OgVXMML');

    console.log(await ds.keys.list());
  } catch (e) {
    console.log(e);
  }
};

onSession();
