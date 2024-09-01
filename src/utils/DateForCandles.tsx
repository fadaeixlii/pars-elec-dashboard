export enum FrameTimeEnum {
  MIN = 1,
  MIN5 = 5,
  MIN15 = 15,
  MIN30 = 30,
  HOUR1 = 60,
  HOUR2 = 120,
  HOUR4 = 240,
  HOUR8 = 480,
  DAILY1 = 1440,
  DAILY7 = 10080,
  DAILY15 = 21600,
  MONTHLY1 = 43200,
}
export enum FrameTimeStringEnum {
  MIN = 'MIN',
  MIN5 = 'MIN5',
  MIN15 = 'MIN15',
  MIN30 = 'MIN30',
  HOUR1 = 'HOUR1',
  HOUR2 = 'HOUR2',
  HOUR4 = 'HOUR4',
  HOUR8 = 'HOUR8',
  DAILY1 = 'DAILY1',
  DAILY7 = 'DAILY7',
  DAILY15 = 'DAILY15',
  MONTHLY1 = 'MONTHLY1',
}

export function mapFrameTimeEnumToFrameTimeStringEnum(
  frameTimeEnum: FrameTimeEnum,
): FrameTimeStringEnum {
  switch (frameTimeEnum) {
    case FrameTimeEnum.MIN:
      return FrameTimeStringEnum.MIN
    case FrameTimeEnum.MIN5:
      return FrameTimeStringEnum.MIN5
    case FrameTimeEnum.MIN15:
      return FrameTimeStringEnum.MIN15
    case FrameTimeEnum.MIN30:
      return FrameTimeStringEnum.MIN30
    case FrameTimeEnum.HOUR1:
      return FrameTimeStringEnum.HOUR1
    case FrameTimeEnum.HOUR2:
      return FrameTimeStringEnum.HOUR2
    case FrameTimeEnum.HOUR4:
      return FrameTimeStringEnum.HOUR4
    case FrameTimeEnum.HOUR8:
      return FrameTimeStringEnum.HOUR8
    case FrameTimeEnum.DAILY1:
      return FrameTimeStringEnum.DAILY1
    case FrameTimeEnum.DAILY7:
      return FrameTimeStringEnum.DAILY7
    case FrameTimeEnum.DAILY15:
      return FrameTimeStringEnum.DAILY15
    case FrameTimeEnum.MONTHLY1:
      return FrameTimeStringEnum.MONTHLY1
    default:
      throw new Error('Invalid FrameTimeEnum value')
  }
}

interface TimeRange {
  fromTime: number
  toTime: number
}

export function generateTimeForCandle(
  timeFrame: FrameTimeEnum,
  currentTimeDependFrame: number,
): TimeRange {
  const currentTime = new Date()
  const frameTime = timeFrame * 60 * 1000 // Convert minutes to milliseconds

  const fromTime =
    currentTimeDependFrame === 0
      ? currentTime.getTime() - 15 * frameTime
      : currentTime.getTime() -
        (15 * frameTime * currentTimeDependFrame + 15 * frameTime)

  const toTime =
    currentTimeDependFrame === 0
      ? currentTime.getTime()
      : currentTime.getTime() - 15 * frameTime * currentTimeDependFrame

  return { fromTime, toTime }
}
export function generateTimeForCandleStrick(
  timeFrame: FrameTimeEnum,
  currentTimeDependFrame: number,
): TimeRange {
  const currentTime = new Date()
  const frameTime = timeFrame * 60 * 1000 // Convert minutes to milliseconds

  const fromTime =
    currentTimeDependFrame === 0
      ? currentTime.getTime() - 150 * frameTime
      : currentTime.getTime() -
        (150 * frameTime * currentTimeDependFrame + 150 * frameTime)

  const toTime =
    currentTimeDependFrame === 0
      ? currentTime.getTime()
      : currentTime.getTime() - 150 * frameTime * currentTimeDependFrame

  return { fromTime, toTime }
}
