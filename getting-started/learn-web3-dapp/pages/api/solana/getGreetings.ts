import { Connection, PublicKey  } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSafeUrl } from '@solana/lib';
import * as borsh from 'borsh';

// The state of a greeting account managed by the hello world program
class GreetingAccount {
  counter = 0;
  constructor(fields: {counter: number} | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);

export default async function getGreetings(
  req: NextApiRequest,
  res: NextApiResponse<string | number>
) {
  try {
    console.log("STEVENDEBUG getGreetings start ")

    const { greeter } = req.body;

    console.log("STEVENDEBUG greeter ", greeter)

    const url = getSafeUrl();
    const connection = new Connection(url, "confirmed");
    const greeterPublicKey = new PublicKey(greeter);

    const accountInfo = await connection.getAccountInfo(greeterPublicKey);

    console.log("STEVENDEBUG accountInfo ", accountInfo)

    if (accountInfo === null) {
      throw new Error('Error: cannot find the greeted account');
    }

    // Find the expected parameters.
    const greeting = borsh.deserialize(GreetingSchema,
      GreetingAccount,
      accountInfo.data
    )

    // A short helper
    console.log(greeting)

    // Pass down the counter
    res.status(200).json(greeting.counter);
  } catch(error) {
    console.error(error);
    res.status(500).json('Get Greeting failed');
  }
}
