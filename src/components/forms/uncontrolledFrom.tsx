import { useState } from 'react';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectCountries,
  selectGenders,
  selectUsers,
} from '../../store/user/appSelectors';
import { submitUserData } from '../../store/user/appSlice';
import { useModalContext } from '../../hooks/useModalContext';
import { CustomProgress } from '../ui/custom-progress';
import { checkPasswordStrength } from '../../utils/checkPasswordStrength';
import { fileToBase64 } from '../../utils/fileToBase64';

export function UncontrolledFrom() {
  const { handleModalClose } = useModalContext();

  const [passwordStrength, setPasswordStrength] = useState(0);

  const dispatch = useAppDispatch();
  const genders = useAppSelector(selectGenders);
  const countries = useAppSelector(selectCountries);
  const users = useAppSelector(selectUsers);

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    handleModalClose();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;

    setPasswordStrengthProgress(password);
  };

  const setPasswordStrengthProgress = (password: string) => {
    const strengthCheckResult = checkPasswordStrength(password);

    const passedCount =
      Object.values(strengthCheckResult).filter(Boolean).length;
    const totalCount = Object.keys(strengthCheckResult).length;
    const strength = passedCount / totalCount;

    setPasswordStrength(strength);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col" htmlFor="name">
          Name:
          <input name="name" type="text" id="name" />
        </label>

        <label className="flex flex-col" htmlFor="email">
          Email:
          <input name="email" type="email" id="email" />
        </label>

        <label className="flex flex-col" htmlFor="gender">
          Gender:
          <select className="capitalize" name="gender" id="gender">
            {genders.map((gender) => (
              <option className="capitalize" key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-around">
          <label className="flex flex-col items-center gap-3" htmlFor="age">
            Age:
            <input
              name="age"
              type="number"
              id="age"
              min="18"
              className="w-15"
            />
          </label>

          <label className="flex flex-col items-center gap-3" htmlFor="terms">
            Terms & Conditions:
            <input name="terms" type="checkbox" id="terms" className="w-10" />
          </label>
        </div>
      </div>

      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="flex flex-col" htmlFor="password">
            Password:
            <input
              name="password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
          </label>
          {passwordStrength > 0 && (
            <CustomProgress strength={passwordStrength} />
          )}
        </div>

        <label className="flex flex-col" htmlFor="confirmPassword">
          Confirm password:
          <input name="confirmPassword" type="password" id="confirmPassword" />
        </label>

        <label className="flex flex-col" htmlFor="avatar">
          Avatar:
          <input
            name="avatar"
            type="file"
            accept="image/png, image/jpeg"
            id="avatar"
          />
        </label>

        <label className="flex flex-col" htmlFor="country">
          Country:
          <input
            className="capitalize"
            list="countries"
            name="country"
            type="text"
            id="country"
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </label>
      </div>

      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <Button className="mx-auto" type="submit">
        Create
      </Button>
    </form>
  );
}
