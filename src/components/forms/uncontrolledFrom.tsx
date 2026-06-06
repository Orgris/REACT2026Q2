import { useRef } from 'react';
import { Button } from '../ui/button';

interface UserData {
  email: string;
  password: string;
  username: string;
  avatar: File | null;
  age: number;
  gender: string;
  country: string;
  terms: boolean;
}

interface FormData extends UserData {
  confirmPassword: string;
}

export function UncontrolledFrom() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const getValueFromInput = (
      ref: React.RefObject<HTMLInputElement | HTMLSelectElement | null>
    ) => ref.current?.value ?? '';

    const formData: FormData = {
      email: getValueFromInput(emailRef),
      password: getValueFromInput(passwordRef),
      confirmPassword: getValueFromInput(confirmPasswordRef),
      username: getValueFromInput(usernameRef),
      avatar: avatarRef.current?.files?.[0] || null,
      age: ageRef.current?.value ? Number(ageRef.current.value) : 18,
      gender: getValueFromInput(genderRef),
      country: getValueFromInput(countryRef),
      terms: termsRef.current?.checked || false,
    };

    console.log('Submitted Data:', formData);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} name="email" type="email" id="email" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            ref={passwordRef}
            name="password"
            type="password"
            id="password"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            ref={confirmPasswordRef}
            name="confirmPassword"
            type="password"
            id="confirmPassword"
          />
        </div>
      </div>

      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <div className="flex flex-col">
        <label htmlFor="username">Username:</label>
        <input ref={usernameRef} name="username" type="text" id="username" />
      </div>

      <div className="flex flex-col">
        <label htmlFor="avatar">Avatar:</label>
        <input ref={avatarRef} name="avatar" type="file" id="avatar" />
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-3">
          <label htmlFor="age">Age:</label>
          <input
            ref={ageRef}
            name="age"
            type="number"
            id="age"
            min="18"
            className="w-15"
          />
        </div>

        <div className="flex flex-col items-center gap-3">
          <label htmlFor="gender">Gender:</label>
          <select ref={genderRef} name="gender" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col items-center gap-3">
          <label htmlFor="country">Country:</label>
          <select ref={countryRef} name="country" id="country">
            <option value="rus">Russia</option>
            <option value="eng">English</option>
          </select>
        </div>
      </div>

      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <div className="flex gap-3">
        <label htmlFor="terms">Terms & Conditions:</label>
        <input
          ref={termsRef}
          name="terms"
          type="checkbox"
          id="terms"
          className="w-10"
        />
      </div>

      <Button className="mx-auto" type="submit">
        Create
      </Button>
    </form>
  );
}
