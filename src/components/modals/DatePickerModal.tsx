import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { format } from 'date-fns'
import { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import { DATE_LOCALE } from '../../constants/settings'
import {
  DATEPICKER_CHOOSE_TEXT,
  DATEPICKER_TITLE,
  DATEPICKER_TODAY_TEXT,
} from '../../constants/strings'
import { getToday, getYesterday, removeTime } from '../../lib/dateutils'
import { firstGameDate } from '../../lib/words'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  initialDate?: Date
  handleSelectDate: (date: Date) => void
  handleClose: () => void
}

export const DatePickerModal = ({
  isOpen,
  initialDate,
  handleSelectDate,
  handleClose,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    if (initialDate == null || initialDate > getYesterday()) {
      return getYesterday()
    }
    return initialDate
  })

  const headingDateFormat = 'MMMM yyyy'
  const buttonDateFormat = 'd MMM yyyy'
  const formatOptions = { locale: DATE_LOCALE }

  registerLocale('locale', DATE_LOCALE)

  return (
    <BaseModal
      title={DATEPICKER_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-center space-x-4 py-5 text-left sm:w-48">
        <DatePicker
          locale="locale"
          minDate={firstGameDate}
          maxDate={getYesterday()}
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(removeTime(date))}
          inline
          popperClassName="react-datepicker-left"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <span className="text-lg text-gray-700 dark:text-gray-100">
                {format(date, headingDateFormat, formatOptions)}
              </span>

              <div className="space-x-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={`
                            ${
                              prevMonthButtonDisabled &&
                              'cursor-not-allowed opacity-50'
                            }
                            inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                            dark:border-gray-600 dark:bg-slate-700 dark:text-gray-200 dark:focus:ring-blue-600
                        `}
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={`
                            ${
                              nextMonthButtonDisabled &&
                              'cursor-not-allowed opacity-50'
                            }
                            inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                            dark:border-gray-600 dark:bg-slate-700 dark:text-gray-200 dark:focus:ring-blue-600
                        `}
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          )}
        />
      </div>
      <div className="mt-5 flex columns-2 items-center items-stretch justify-center gap-2 text-center dark:text-white sm:mt-6">
        <button
          type="button"
          className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
          onClick={() => handleSelectDate(getToday())}
        >
          {DATEPICKER_CHOOSE_TEXT} {DATEPICKER_TODAY_TEXT}
        </button>
        <button
          type="button"
          className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 sm:text-base"
          disabled={selectedDate >= getToday()}
          onClick={() => handleSelectDate(selectedDate)}
        >
          {DATEPICKER_CHOOSE_TEXT}
          <br />
          {format(selectedDate, buttonDateFormat, formatOptions)}
        </button>
      </div>
    </BaseModal>
  )
}
