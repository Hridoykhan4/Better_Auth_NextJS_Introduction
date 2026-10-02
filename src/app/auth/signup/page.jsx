'use client'
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {

    const onSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const { name, email, password } = Object.fromEntries(formData.entries());
        console.log("Form submitted with:", name, email, password);

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL: '/'
        })

        /* {
             token: '2OXJ4jIsJCUfWazKDfE35HmXLYhJvm1F',
             user: {
      name: 'Angela Medina',
      email: 'vynij@mailinator.com',
      emailVerified: false,
      createdAt: new Date('2026-10-02T15:24:51.000Z'),
      updatedAt: new Date('2026-10-02T15:24:51.000Z'),
      id: '6abfccc3626552a6b29840ce'
    }
  } */

        /* 
          {
            message: 'User already exists. Use another email.',
            code: 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL',
            status: 422,
            statusText: 'UNPROCESSABLE_ENTITY'
          }
        */



        console.log(data, error);

        if(error) {
            alert("Error signing up: " + error.message);
        }
        if(data) {
            alert(`Sign up successful! Please check your email to verify your account`)
        }


    }

    return (
        <div>
            <h2>Please Sign up</h2>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                {/* name */}
                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input name="name" placeholder="Your Name" />
                    <FieldError />
                </TextField>
                {/* email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input name="email" placeholder="Your Email Address" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input name="password" placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1           number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignUpPage;