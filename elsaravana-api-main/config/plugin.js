module.exports = ({ env }) => ({
    // ...
    upload: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('dsykbphvz'),
        api_key: env('735123357341513'),
        api_secret: env('20YZGMVgofuloAPkmujPsodvjlg'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
    // ...
  });