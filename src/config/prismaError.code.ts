export const ERROR_CODES = {
  PRISMA: {
    P1013: {
      message: 'The provided database string is invalid.',
      code: 500,
    },
    P1014: {
      message: 'The underlying for model does not exist.',
      code: 500,
    },
    P1015: {
      message: 'Your Prisma schema is using features that are not supported for the version of the database',
      code: 500,
    },
    P1016: {
      message: 'Your raw query had an incorrect number of parameters.',
      code: 500,
    },
    P1017: {
      message: 'Server has closed the connection.',
      code: 500,
    },
    P2000: {
      message: "The provided value for the column is too long for the column's type. Column",
      code: 500,
    },
    P2001: {
      message: 'The record searched for in the where condition does not exist',
      code: 500,
    },
    P2002: {
      message: 'Already exist. Try another one.',
      code: 500,
    },
    P2003: {
      message: 'Foreign key constraint failed on the field',
      code: 500,
    },
    P2004: {
      message: 'A constraint failed on the database',
      code: 500,
    },
    P2005: {
      message: "The value is invalid for the field's type",
      code: 500,
    },
    P2006: {
      message: 'The provided value is not valid',
      code: 500,
    },
    P2007: {
      message: 'Data validation error',
      code: 500,
    },
    P2008: {
      message: 'Failed to parse the query',
      code: 500,
    },
    P2009: {
      message: 'Failed to validate the query',
      code: 500,
    },
    P2010: {
      message: 'Raw query failed.',
      code: 500,
    },
    P2011: {
      message: 'Null constraint violation',
      code: 500,
    },
    P2012: {
      message: 'Missing a required value',
      code: 500,
    },
    P2013: {
      message: 'Missing the required argument',
      code: 500,
    },
    P2014: {
      message: 'The change you are trying to make would violate the required relation.',
      code: 500,
    },
    P2015: {
      message: 'A related record could not be found',
      code: 500,
    },
    P2016: {
      message: 'Query interpretation error.',
      code: 500,
    },
    P2017: {
      message: 'The records for relation models are not connected.',
      code: 500,
    },
    P2018: {
      message: 'The required connected records were not found.',
      code: 500,
    },
    P2019: {
      message: 'Input error.',
      code: 500,
    },
    P2020: {
      message: 'Value out of range for the type.',
      code: 500,
    },
    P2021: {
      message: 'The table does not exist in the current database.',
      code: 500,
    },
    P2022: {
      message: 'The column does not exist in the current database.',
      code: 500,
    },
    P2023: {
      message: 'Inconsistent column data',
      code: 500,
    },
    P2024: {
      message:
        'Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool Current connection pool timeout:',
      code: 500,
    },
    P2025: {
      message: 'An operation failed because it depends on one or more records that were required but not found.',
      code: 500,
    },
    P2026: {
      message: "The current database provider doesn't support a feature that the query used:",
      code: 500,
    },
    P2027: {
      message: 'Multiple errors occurred on the database during query execution:',
      code: 500,
    },
    P2028: {
      message: 'Transaction API error',
      code: 500,
    },
    P2030: {
      message:
        'Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema',
      code: 500,
    },
    P2031: {
      message:
        'Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set',
      code: 500,
    },
    P2033: {
      message:
        "A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers",
      code: 500,
    },
    P2034: {
      message: 'Transaction failed due to a write conflict or a deadlock. Please retry your transaction',
      code: 500,
    },
  },
};
