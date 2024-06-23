import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Button } from "@/components/ui/button";

function Auth() {
  const [active, setActive] = useState(true);
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex justify-center items-center w-[30rem] h-[30rem] rounded-[20px]">
        <div className="absolute inset-[40px] flex flex-col justify-center items-center">
          <div className="w-full px-10 space-y-5">
            {active ? <Signup /> : <Login />}
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <span className="">Already have account?</span>
            <Button
              variant="ghost"
              onClick={() => setActive(!active)}
              className="w-auto"
            >
              {active ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;