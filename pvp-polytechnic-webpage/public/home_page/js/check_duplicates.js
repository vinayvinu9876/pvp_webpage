function check_duplicate(arr,file_name,specify)
{
  for(i=0;i<arr.length;i++)
  {
    if(arr[i][specify].img_name====file_name)
    {
        return true;
    }

  }
  return false;
}
