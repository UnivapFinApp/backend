import { SetMetadata } from "@nestjs/common";


/* KEYS */
export const IS_PUBLIC_KEY = 'isPublic';


/* DECORATORS */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);