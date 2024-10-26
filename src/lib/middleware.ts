import multer from 'multer';
import type { NextFetchEvent, NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
// Configure multer
const router = createEdgeRouter<NextRequest, NextFetchEvent>();

const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
});

const middleware = router;
// Apply multer middleware
// middleware.use(upload.single('file')); // 'file' is the field name used in the form
middleware.use(async (req, event, next) => {upload.single('image')});
export default middleware;
