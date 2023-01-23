export interface IPaginationProps {
  limit: number,
  max: number,
  min?: number,
  currentPage: number,
  maxPage: number,
  onChange(value: number): void,
  onNext(): void,
  onPrev(): void
}