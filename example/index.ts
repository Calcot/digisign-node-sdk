import { createSession } from '../lib/factory';
import { SessionEnvironment } from '../lib/types';

const onSession = async () => {
  try {
    const ds = await createSession({
      key: 'ds_CSCy7yiAcIod9suap3a3LOQL7HSrQr6va',
      environment: SessionEnvironment.SANDBOX,
    });
    // ds_CSCy7yiAcIod9suap3a3LOQL7HSrQr6va
    // ds_fS8k5zPmjX9haMGwIJVsezT5m2OgVXMML

    const webhooks = await ds.webhooks
      .workspace('fd259248-0527-40ea-adbb-3c23a9ce353a')
      .list();

    const keys = await ds.keys.list({
      page: 1,
      limit: 30,
    });

    const data = {
      recipients: [
        {
          id: 'tmp-ee55621f-ab34-4d61-b10e-c89b33464d5a',
          name: 'Simeon Akpanudo',
          email: 'akpanudosimeon@gmail.com',
        },
      ],
      message: {
        subject: 'Avocado Replublic Export v1.1',
        body: 'Please review and sign this document as soon as you can. Thanks',
      },
    };

    const request = await ds.templates
      .workspace('fd259248-0527-40ea-adbb-3c23a9ce353a')
      .transform('692a8f67-fa37-4d74-b6c8-e316d05d7145', data);

    console.log(webhooks, keys.data.length, request);
  } catch (e) {
    console.log(e);
  }
};

onSession();
