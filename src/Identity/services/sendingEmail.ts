import SES from 'aws-sdk/clients/ses';

const ses = new SES({
  region: 'us-east-1',
  accessKeyId: 'AKIAWSKED4JSTKQC54I3',
  secretAccessKey: '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'
});

export default async (ToAddresses: string, BodyData: string, SubjectData: string) => {
  try {
    const sendRes = await ses
      .sendEmail(
        {
          Destination: {
            ToAddresses: [ToAddresses]
          },
          Message: {
            Body: {
              Text: {
                Data: BodyData
              }
            },
            Subject: {
              Data: SubjectData
            }
          },
          Source: 'myf.finances@gmail.com',
          ConfigurationSetName: 'myfConfigurationSetName'
        },
          )
      .promise();

    return sendRes;
  } catch (err) {
    return err;
  }
};
