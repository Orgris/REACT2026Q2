import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: undefined,
      email: undefined,
      gender: undefined,
      age: undefined,
      password: undefined,
      confirmPassword: undefined,
      avatar: undefined,
      country: undefined,
      terms: undefined,
    },
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

  const handlePasswordChange = (value: string) => {
    setPasswordStrengthProgress(value);
  };

  const encodeAvatar = async (avatar: File | undefined) => {
    if (!avatar || avatar.size === 0) {
      return undefined;
    }

    try {
      return await fileToBase64(avatar);
    } catch {
      return undefined;
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
            <Controller
              name="name"
              control={control}
              render={({ field }) => <input type="text" id="name" {...field} />}
            />
            <ErrorMessage error={errors.name?.message} />
          </label>

          <label className="flex flex-col" htmlFor="email">
            Email:
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input type="email" id="email" {...field} />
              )}
            />
            <ErrorMessage error={errors.email?.message} />
          </label>

          <label className="flex flex-col" htmlFor="gender">
            Gender:
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select className="capitalize" id="gender" {...field}>
                  {genders.map((gender) => (
                    <option className="capitalize" key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              )}
            />
            <ErrorMessage error={errors.gender?.message} />
          </label>

          <label className="flex flex-col" htmlFor="age">
            Age:
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  id="age"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || undefined)
                  }
                />
              )}
            />
            <ErrorMessage error={errors.age?.message} />
          </label>
        </div>

        <div className="h-full w-px rounded-lg border-2 border-(--border)"></div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-col">
            <label className="flex flex-col" htmlFor="password">
              Password:
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type="password"
                    id="password"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handlePasswordChange(e.target.value);
                    }}
                  />
                )}
              />
            </label>
            <CustomProgress strength={passwordStrength} />
          </div>

          <label className="flex flex-col" htmlFor="confirmPassword">
            Confirm password:
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <input type="password" id="confirmPassword" {...field} />
              )}
            />
            <ErrorMessage error={errors.confirmPassword?.message} />
          </label>

          <label className="flex flex-col" htmlFor="avatar">
            Avatar:
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="avatar"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
              )}
            />
            <ErrorMessage error={errors.avatar?.message} />
          </label>

          <label className="flex flex-col" htmlFor="country">
            Country:
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className="capitalize"
                    list="countries"
                    type="text"
                    id="country"
                    {...field}
                  />
                  <datalist id="countries">
                    {countries.map((country) => (
                      <option key={country} value={country} />
                    ))}
                  </datalist>
                </>
              )}
            />
            <ErrorMessage error={errors.country?.message} />
          </label>
        </div>
      </div>

      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col self-start">
          <label className="flex w-fit items-center gap-3" htmlFor="terms">
            Terms & Conditions:
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="terms"
                  className="size-5 grow-0"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
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
