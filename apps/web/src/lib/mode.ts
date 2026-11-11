import { CvModeSchema, type CvMode } from "@/content/schema";

/** Production shows only verified content. Set NEXT_PUBLIC_CV_MODE=target for the roadmap preview. */
export const cvMode: CvMode = CvModeSchema.catch("verified").parse(process.env.NEXT_PUBLIC_CV_MODE);
