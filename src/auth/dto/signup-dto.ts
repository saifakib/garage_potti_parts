import { z } from 'zod'
const bdPhoneRegex = new RegExp(/^[\+]?8801[3-9][0-9]{8}$/);

export const SignUpSchema = z.object({
    email: z.string().email({ message: 'Email should be a valid email'}).optional(),
    mobile: z.string().regex(bdPhoneRegex, 'Invalid phone number!').optional(),
    userType: z.enum(['END_USER', 'SERVICE_PROVIDER']),
    password: z.string(),
    signUpMethod: z.enum(['EMAIL', 'MOBILE', "GUEST"]),
  }) .refine((data) => {
    const { userType, email, mobile } = data;
    if(email && mobile) {
      return !(email && mobile)
      //throw new Error('You have to provide email or mobile any one of them');
    }
    if (userType === 'SERVICE_PROVIDER') {
      if (!email && !mobile) {
        return !(!email && !mobile)
        //throw new Error('Service providers must provide either email or mobile number');
      }
    }

    if(data.signUpMethod == 'EMAIL') {
      return email != undefined;
    }
    if(data.signUpMethod == 'MOBILE') {
      return mobile != undefined;
    }
    if(data.signUpMethod == 'GUEST') {
      return email == undefined && data.mobile == undefined;
    }
   
    return true;
  });

export type SignUpDto = z.infer<typeof SignUpSchema>;
