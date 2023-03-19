const express = require('express');
const router = express.Router();

const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} = require('../controllers/jobs');

const {
    createJobValidator,
    getJobValidator,
    updateJobValidator,
    deleteJobValidator,
} = require('../validators/jobValidator')


router.route('/')
    .post(createJobValidator, createJob)
    .get(getAllJobs);
router.route('/:id')
    .get(getJobValidator, getJob)
    .delete(deleteJobValidator, deleteJob)
    .patch(updateJobValidator, updateJob);

module.exports = router;