import SES from 'aws-sdk/clients/ses';

const ses = new SES({
  region: 'us-east-1',
  accessKeyId: 'AKIAWSKED4JSTKQC54I3',
  secretAccessKey: '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'
});

export default async () => {
  console.log('sending Email function is run.');

  try {
    const sendRes = await ses
      .sendEmail(
        {
          Destination: {
            ToAddresses: ['danskyjs@icloud.com', 'drckbr@gmail.com']
          },
          Message: {
            Body: {
              Text: {
                Data: 'teste teste teste'
              }
            },
            Subject: {
              Data: 'teste teste teste teste'
            }
          },
          Source: 'myf.finances@gmail.com',
          ConfigurationSetName: 'myfConfigurationSetName'
        },
        (err, data) => {
          console.log({ err, data });
        }
      )
      .promise();

    console.log({ sendRes });
  } catch (err) {
    const { message } = err;
    console.log({ message });
    throw new Error(message);
  }
};
