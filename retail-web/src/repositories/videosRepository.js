// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from "axios";
import resolveBaseURL from './resolveBaseURL'
import localVideoRepository from "@/repositories/localVideoRepository";

const baseURL = resolveBaseURL(
  import.meta.env.VITE_VIDEOS_SERVICE_DOMAIN,
  import.meta.env.VITE_VIDEOS_SERVICE_PORT,
  import.meta.env.VITE_VIDEOS_SERVICE_PATH
)

const connection = axios.create({
  baseURL
})

export default {
  async get() {
    if (import.meta.env.VITE_USE_LOCAL_DATA === "true") {
      return await localVideoRepository.getStreamDetail()
    } else {
      return await connection.get(`stream_details`)
    }
  },
}
