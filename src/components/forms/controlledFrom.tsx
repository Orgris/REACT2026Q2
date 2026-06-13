import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import type { FormValues, UserData } from '../../types/types';
import { getRegisterSchema } from '../../utils/registerSchema';
import { ErrorMessage } from '../ui/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

export function ControlledForm() {
  const { handleModalClose } = useModalContext();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const dispatch = useAppDispatch();
  const genders = useAppSelector(selectGenders);
  const countries = useAppSelector(selectCountries);
  const users = useAppSelector(selectUsers);

  const schema = getRegisterSchema(countries);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
    mode: 'onChange',
  });

  const setPasswordStrengthProgress = (password: string) => {
    const strengthCheckResult = checkPasswordStrength(password);
    const passedCount =
      Object.values(strengthCheckResult).filter(Boolean).length;
    const totalCount = Object.keys(strengthCheckResult).length;
    const strength = passedCount / totalCount;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordStrengthProgress(event.target.value);
  };

  const encodeAvatar = async (avatar: File | undefined) => {
    if (!avatar || avatar.size === 0) {
      setError('avatar', {
        type: 'manual',
        message: 'Image file size is 0',
      });
      return;
    }

    try {
      return await fileToBase64(avatar);
    } catch {
      setError('avatar', {
        type: 'manual',
        message: 'Image processing error',
      });
      return;
    }
  };

  const onSubmit = async (data: FormValues) => {
    const encodedAvatar = await encodeAvatar(data.avatar);

    const validatedUserData: UserData = {
      id: users.length,
      email: data.email,
      password: data.password,
      name: data.name,
      age: Number(data.age),
      gender: data.gender,
      country: data.country,
      terms: data.terms,
      avatar: encodedAvatar,
    };

    dispatch(submitUserData(validatedUserData));
    handleModalClose();
  };

  return (
    <form
      className="flex grow flex-col gap-3"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-1 gap-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <label className="flex flex-col" htmlFor="name">
            Name:
            <input type="text" id="name" {...register('name')} />
            <ErrorMessage error={errors.name?.message} />
          </label>

          <label className="flex flex-col" htmlFor="email">
            Email:
            <input type="email" id="email" {...register('email')} />
            <ErrorMessage error={errors.email?.message} />
          </label>

          <label className="flex flex-col" htmlFor="gender">
            Gender:
            <select className="capitalize" id="gender" {...register('gender')}>
              {genders.map((gender) => (
                <option className="capitalize" key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <ErrorMessage error={errors.gender?.message} />
          </label>

          <label className="flex flex-col" htmlFor="age">
            Age:
            <input type="number" id="age" {...register('age')} />
            <ErrorMessage error={errors.age?.message} />
          </label>
        </div>

        <div className="w-px self-stretch rounded-lg border-2 border-(--border)"></div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-col">
            <label className="flex flex-col" htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                {...register('password')}
                onChange={handlePasswordChange}
              />
            </label>
            <CustomProgress strength={passwordStrength} />
          </div>

          <label className="flex flex-col" htmlFor="confirmPassword">
            Confirm password:
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
            />
            <ErrorMessage error={errors.confirmPassword?.message} />
          </label>

          <label className="flex flex-col" htmlFor="avatar">
            Avatar:
            <input
              type="file"
              accept="image/png, image/jpeg"
              id="avatar"
              {...register('avatar')}
            />
            <ErrorMessage error={errors.avatar?.message} />
          </label>

          <label className="flex flex-col" htmlFor="country">
            Country:
            <input
              className="capitalize"
              list="countries"
              type="text"
              id="country"
              {...register('country')}
            />
            <datalist id="countries">
              {countries.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
            <ErrorMessage error={errors.country?.message} />
          </label>
        </div>
      </div>

      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col self-start">
          <label className="flex w-fit items-center gap-3" htmlFor="terms">
            Terms & Conditions:
            <input
              type="checkbox"
              id="terms"
              className="size-5 grow-0"
              {...register('terms')}
            />
          </label>
          <ErrorMessage error={errors.terms?.message} />
        </div>

        <Button className="size-fit" type="submit" disabled={!isValid}>
          Create
        </Button>
      </div>
    </form>
  );
}
