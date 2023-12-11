export * from './keys/types';
export * from './workspaces/types';
import { createSession } from './factory';

const onSession = async () => {
  try {
    const ds = await createSession('ds_CSCy7yiAcIod9suap3a3LOQL7HSrQr6va');
    // ds_CSCy7yiAcIod9suap3a3LOQL7HSrQr6va
    // ds_fS8k5zPmjX9haMGwIJVsezT5m2OgVXMML
    // console.log(await ds.keys.list());

    console.log(
      await ds.webhooks
        .workspace('fd259248-0527-40ea-adbb-3c23a9ce353a')
        .list(),
    );
  } catch (e) {
    console.log(e);
  }
};

onSession();
