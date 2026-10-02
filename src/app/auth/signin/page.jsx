'use client'
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


const SigninPage = () => {
    const [isVisible, setIsVisible] = useState(false)
    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {email, password} = Object.fromEntries(formData.entries());
        const {data,error} = await authClient.signIn.email({
            email,
            password,
            rememberMe: true,
            callbackURL: '/dashboard'
        })
        console.log(data, error);
    }

    return (
        <div>
            <h2>Please Sign In</h2>
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>

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
                {/* password */}
                <TextField className="w-full max-w-[280px]" name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full max-w-[280px]"
                            type={isVisible ? "text" : "password"}
                            name="password"
                            placeholder="Your Password"
                        />
                        <InputGroup.Suffix className="pr-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
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

export default SigninPage;