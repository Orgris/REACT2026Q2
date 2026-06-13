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
import type { UserData } from '../../types/types';
import { getRegisterSchema } from '../../utils/registerSchema';
import * as yup from 'yup';
import { ErrorMessage } from '../ui/error-message';

export function UncontrolledFrom() {
  const { handleModalClose } = useModalContext();

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useAppDispatch();
  const genders = useAppSelector(selectGenders);
  const countries = useAppSelector(selectCountries);
  const users = useAppSelector(selectUsers);

  const schema = getRegisterSchema(countries);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      name: (event.currentTarget.elements.namedItem('name') as HTMLInputElement)
        ?.value,
      age: event.currentTarget.age?.value,
      email: event.currentTarget.email?.value,
      password: event.currentTarget.password?.value,
      confirmPassword: event.currentTarget.confirmPassword?.value,
      gender: event.currentTarget.gender?.value,
      country: event.currentTarget.country?.value,
      terms: event.currentTarget.terms?.checked,
      avatar: event.currentTarget.avatar?.files,
    };

    try {
      await schema.validate(formValues, { abortEarly: false });

      const avatarFile = formValues.avatar as File;
      const encodedAvatar = await encodeAvatar(avatarFile);

      const validatedUserData: UserData = {
        id: users.length,
        email: formValues.email,
        password: formValues.password,
        name: formValues.name,
        age: Number(formValues.age),
        gender: formValues.gender,
        country: formValues.country,
        terms: formValues.terms,
        avatar: encodedAvatar,
      };

      dispatch(submitUserData(validatedUserData));
      handleModalClose();
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const formattedErrors: Record<string, string> = {};

        validationError.inner.forEach((err) => {
          if (err.path) formattedErrors[err.path] = err.message;
        });

        setErrors(formattedErrors);
      }
    }
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

  const encodeAvatar = async (avatar: File | undefined) => {
    if (!avatar || avatar.size === 0) {
      setErrors({ avatar: 'Image file size is 0' });
      return;
    }

    try {
      return await fileToBase64(avatar);
    } catch {
      setErrors({ avatar: 'Image processing error' });
      return;
    }
  };

  return (
    <form
      className="flex grow flex-col gap-3"
      noValidate
      onSubmit={handleSubmit}
      onChange={() => setErrors({})}
    >
      <div className="flex w-full flex-1 gap-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <label className="flex flex-col" htmlFor="name">
            Name:
            <input name="name" type="text" id="name" />
            <ErrorMessage error={errors.name} />
          </label>

          <label className="flex flex-col" htmlFor="email">
            Email:
            <input name="email" type="email" id="email" />
            <ErrorMessage error={errors.email} />
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
            <ErrorMessage error={errors.gender} />
          </label>

          <label className="flex flex-col" htmlFor="age">
            Age:
            <input name="age" type="number" id="age" />
            <ErrorMessage error={errors.age} />
          </label>
        </div>

        <div className="w-px self-stretch rounded-lg border-2 border-(--border)"></div>

        <div className="flex min-w-0 flex-1 flex-col">
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
            <CustomProgress strength={passwordStrength} />
          </div>

          <label className="flex flex-col" htmlFor="confirmPassword">
            Confirm password:
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
            />
            <ErrorMessage error={errors.confirmPassword} />
          </label>

          <label className="flex flex-col" htmlFor="avatar">
            Avatar:
            <input
              name="avatar"
              type="file"
              accept="image/png, image/jpeg"
              id="avatar"
            />
            <ErrorMessage error={errors.avatar} />
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
            <ErrorMessage error={errors.country} />
            <datalist id="countries">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
          </label>
        </div>
      </div>

      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col self-start">
          <label className="flex w-fit items-center gap-3" htmlFor="terms">
            Terms & Conditions:
            <input
              name="terms"
              type="checkbox"
              id="terms"
              className="size-5 grow-0"
            />
          </label>
          <ErrorMessage error={errors.terms} />
        </div>

        <Button className="size-fit" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
}
