import correctionService from '@/api/corrections/client';
import { PostCorrectionsBody } from '@/api/corrections/type';
import { MutateResponse } from '@/api/type';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function usePostCorrectionsMutation(
  options?: Omit<UseMutationOptions<MutateResponse, AxiosError, PostCorrectionsBody>, 'mutationFn'>
) {
  return useMutation({
    mutationFn: (data) => correctionService.postCorrections(data),
    ...options,
  });
}
