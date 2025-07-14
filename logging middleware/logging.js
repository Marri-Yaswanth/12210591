import axios from 'axios'
const Log_Endpoint = 'http://20.244.56.144/evaluation-service/logs'

const Allowed_Stacks = ['backend' , 'frontend']
const Allowed_Levels = ['debug' , 'info', 'warn', 'error' , 'fatal']
const Allowed_Packages = [
    'cache',
    'controller',
    'cron job',
    'db',
    'domain',
    'handler',
    'repository'
]

const Auth_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYXJyaXlhc3dhbnRoNDJAZ21haWwuY29tIiwiZXhwIjoxNzUyNDcxNjM1LCJpYXQiOjE3NTI0NzA3MzUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI0ZTNlYTE3Mi01NDM3LTQ3OTgtODljYi0yOGQ1ZjQ1ZDYyNmIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtYXJyaSB2ZW5rYXRhIHNpdmEgbmFnYSB5YXN3YW50aCIsInN1YiI6IjRmOGNkY2NhLTk3OTMtNDVlYy1hZDViLWFmMGEyMDA5YThiMyJ9LCJlbWFpbCI6Im1hcnJpeWFzd2FudGg0MkBnbWFpbC5jb20iLCJuYW1lIjoibWFycmkgdmVua2F0YSBzaXZhIG5hZ2EgeWFzd2FudGgiLCJyb2xsTm8iOiIxMjIxMDU5MSIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6IjRmOGNkY2NhLTk3OTMtNDVlYy1hZDViLWFmMGEyMDA5YThiMyIsImNsaWVudFNlY3JldCI6InpyQWtFTVZSbnpHZWZFalEifQ.Tt8ojcevL4c676IvfiOyOn3ZTE4UIq3dSQC1jm2bSgA"

