import { useContext } from 'react';
import { ProductReviewContext } from 'src/context';

export const useProductReview= () => useContext(ProductReviewContext);
