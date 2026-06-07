import { useRef } from 'react';
import { Button } from '../ui/button';
import { useAppSelector } from '../../hooks/hooks';
import { selectGenders } from '../../store/user/appSelectors';
import type { RegisterFormData } from '../../types/types';
import { getValueFromInput } from '../../utils/getValueFromInput';
import { useModalContext } from '../../hooks/useModalContext';

export function UncontrolledFrom() {
  const { handleModalClose } = useModalContext();

  const genders = useAppSelector(selectGenders);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const formData: RegisterFormData = {
      email: getValueFromInput(emailRef),
      password: getValueFromInput(passwordRef),
      confirmPassword: getValueFromInput(confirmPasswordRef),
      name: getValueFromInput(nameRef),
      avatar: avatarRef.current?.files?.[0] || null,
      age: ageRef.current?.value ? Number(ageRef.current.value) : 18,
      gender: getValueFromInput(genderRef),
      country: getValueFromInput(countryRef),
      terms: termsRef.current?.checked || false,
    };

    console.log('Submitted Data:', formData);

    handleModalClose();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="name">Name:</label>
          <input ref={nameRef} name="name" type="text" id="name" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} name="email" type="email" id="email" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender">Gender:</label>
          <select
            className="capitalize"
            ref={genderRef}
            name="gender"
            id="gender"
          >
            {genders.map((gender) => (
              <option className="capitalize" key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-around">
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
            <label htmlFor="terms">Terms & Conditions:</label>
            <input
              ref={termsRef}
              name="terms"
              type="checkbox"
              id="terms"
              className="w-10"
            />
          </div>
        </div>
      </div>

      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <div className="flex flex-col gap-3">
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

        <div className="flex flex-col">
          <label htmlFor="avatar">Avatar:</label>
          <input ref={avatarRef} name="avatar" type="file" id="avatar" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="country">Country:</label>
          <input ref={countryRef} name="country" type="text" id="country" />
        </div>
      </div>
      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <Button className="mx-auto" type="submit">
        Create
      </Button>
    </form>
  );
}
